# 手动编译OpenWRT21.02.1并打NAT补丁

参考前文19.07版食用

## 0x0 环境

本次的实验环境是华为提供的泰山200服务器（Taishan 200 Model 2280），双路共64核心arm64。系统为全新安装的debian11。

源码位于用户`home`下，在raid10机械阵列上。另配有SSD分区作为ccache。

目标设备为[WRT32X](https://openwrt.org/toh/hwdata/linksys/linksys_wrt32x_v1_venom)。

## 0x1 安装依赖

参考前文安装依赖。

首先在apt前通通

```
sudo apt update
```

更新软件列表。

文档里写了Ubuntu对应包的安装命令：

```
sudo apt install build-essential ccache ecj fastjar file g++ gawk \
gettext git java-propose-classpath libelf-dev libncurses5-dev \
libncursesw5-dev libssl-dev python python2.7-dev python3 unzip wget \
python3-distutils python3-setuptools rsync subversion swig time \
xsltproc zlib1g-dev 
```

运行即可。

在科大源加持下获得了平均17.9MB/s的下载带宽！

然后获取源码：

```
git clone https://git.openwrt.org/openwrt/openwrt.git
```

cd进去`cd openwrt`

**以下命令均在这个目录下执行**

我们要编译当前最新的发布版。

```
git checkout v21.02.1
```

然后更新feeds：

```
./scripts/feeds update -a
./scripts/feeds install -a
```

## 0x2 配置目标

下载`config.buildinfo`并命名为`.config`：

```
curl https://downloads.openwrt.org/releases/21.02.1/targets/mvebu/cortexa9/config.buildinfo -o .config
```

下载到的`.config`是最小化的，需要将其展开：

```
make defconfig
```

按需配置编译选项

```
make menuconfig
```

- `[Target Profile]`选择WRT32X。
- `[Build the OpenWrt Image Builder]`取消选择
- `[Build the OpenWrt SDK]`取消选择
- `[Advanced configuration options]`进去配置ccache到SSD目录上。

方向键选择`Save`回车保存。再选择`Exit`退出。

## 0x3 首次编译

```
time numactl -i 1 -N 1 make -j32
```

使用CPU2及其local内存，使用32核心编译，并记录时长。

实际建议开个screen再编译，避免中途需要断开连接的问题：

```
screen -S make_openwrt
```

然后在screen里执行make。想撇后台可以摁`CTRL + A + D`去detach。再次来的时候`screen -r make_openwrt`即可。

从0编译完成共花费时长：

```
real    31m39.126s
user    250m24.091s
sys     35m30.852s
```

可知：实际耗时31min19s，编译等计算类任务占用250min，加速比大概在8倍（明明32线程在跑）。另在250min中还有35min属于内核时间，调度啊IO操作之类的。

## 0x4 检查 vermagic

首先获取本地编译的vermagic

```
cat ./build_dir/target-*/linux-*/linux-*/.vermagic
```

现在对比本地编译得到的vermagic和官方值。如果一致，那就继续。不一致请检查上述步骤有无遗漏。

现在已经成功编译得到了和官方镜像配置一致的发布版。

## 0x5 NAT补丁

这里的NAT补丁特指[Chion82](https://github.com/Chion82/netfilter-full-cone-nat)与[LGA1150](https://github.com/LGA1150/openwrt-fullconenat)的FullCone补丁，以及相关其它补丁。

21.02不能够使用19.07的补丁，因此补丁进行了一些小适配。

### 打内核补丁

注：该补丁适用于5.4内核，为OpenWRT21.02.1使用的版本

```
wget -P target/linux/generic/hack-5.4/ https://raw.githubusercontent.com/coolsnowwolf/lede/master/target/linux/generic/hack-5.4/952-net-conntrack-events-support-multiple-registrant.patch
```

### 添加fullconenat包

下载源码。这一步直接将源码放进了代码树中。此处使用了另一个老哥patch的版本。适用于21.02

```
git clone -b master --single-branch https://github.com/llccd/openwrt-fullconenat.git package/fullconenat
```

配置编译选项

```
make menuconfig
```

在`Network -> Firewall -> iptables-mod-fullconenat`这个位置把该选项前面的`<>`摁两次空格改为`<*>`，意为直接编译进镜像。

使用方向键选择`Save`后再选择`Exit`退出

### 添加luci补丁

这里使用了我适配的21.02版本

```
mkdir package/network/config/firewall/patches
wget -P package/network/config/firewall/patches/ https://raw.githubusercontent.com/SalimTerryLi/fullconenat-fw3-patch/tag-v5.4-v21.02.1/fullconenat.patch
pushd feeds/luci
wget -O- https://raw.githubusercontent.com/SalimTerryLi/fullconenat-fw3-patch/tag-v5.4-v21.02.1/luci.patch | git apply
popd
```

### 绕过vermagic

对内核动了手脚，vermagic已经变了。为了能够继续使用在线软件源，需要欺骗openwrt。

这一步有风险，但是鉴于只添加了nat补丁而没有动其它配置，也就只能这样。

> Use at your own risk.

将之前编译得到的`.vermagic`复制出来：

```
cp ./build_dir/target-*/linux-*/linux-*/.vermagic .
```

> 代码树下多个编译目标时警惕，请手动清理

修改内核mk中生成vermagic的代码：

```
sed -i -e 's/^\(.\).*vermagic$/\1cp $(TOPDIR)\/.vermagic $(LINUX_DIR)\/.vermagic/' include/kernel-defaults.mk
```

再次进行编译。

重做`0x3`和`0x4`

在增量编译及ccache加持下，二次编译耗时：

```
real    6m43.965s
user    71m23.656s
sys     11m41.241s
```

```
real    4m46.815s
user    49m18.842s
sys     8m51.308s
```

因为自信ipv6没挂代理导致拖包raw.gayhub时候炸了，数据变成了两段，且不能直接叠加....

加速比分别是10.6和9.8

## 0x6 完成

编译得到的系统镜像在`./bin/target/*/*/`

## 0xf 参考

[19.07版](manually_patch_nat1_and_build_openwrt-19.md)
