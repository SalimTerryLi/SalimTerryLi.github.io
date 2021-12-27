(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{404:function(a,e,t){"use strict";t.r(e);var s=t(54),r=Object(s.a)({},(function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"手动编译openwrt21-02-1并打nat补丁"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#手动编译openwrt21-02-1并打nat补丁"}},[a._v("#")]),a._v(" 手动编译OpenWRT21.02.1并打NAT补丁")]),a._v(" "),t("p",[a._v("参考前文19.07版食用")]),a._v(" "),t("h2",{attrs:{id:"_0x0-环境"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_0x0-环境"}},[a._v("#")]),a._v(" 0x0 环境")]),a._v(" "),t("p",[a._v("本次的实验环境是华为提供的泰山200服务器（Taishan 200 Model 2280），双路共64核心arm64。系统为全新安装的debian11。")]),a._v(" "),t("p",[a._v("源码位于用户"),t("code",[a._v("home")]),a._v("下，在raid10机械阵列上。另配有SSD分区作为ccache。")]),a._v(" "),t("p",[a._v("目标设备为"),t("a",{attrs:{href:"https://openwrt.org/toh/hwdata/linksys/linksys_wrt32x_v1_venom",target:"_blank",rel:"noopener noreferrer"}},[a._v("WRT32X"),t("OutboundLink")],1),a._v("。")]),a._v(" "),t("h2",{attrs:{id:"_0x1-安装依赖"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_0x1-安装依赖"}},[a._v("#")]),a._v(" 0x1 安装依赖")]),a._v(" "),t("p",[a._v("参考前文安装依赖。")]),a._v(" "),t("p",[a._v("首先在apt前通通")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("sudo apt update\n")])])]),t("p",[a._v("更新软件列表。")]),a._v(" "),t("p",[a._v("文档里写了Ubuntu对应包的安装命令：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("sudo apt install build-essential ccache ecj fastjar file g++ gawk \\\ngettext git java-propose-classpath libelf-dev libncurses5-dev \\\nlibncursesw5-dev libssl-dev python python2.7-dev python3 unzip wget \\\npython3-distutils python3-setuptools rsync subversion swig time \\\nxsltproc zlib1g-dev \n")])])]),t("p",[a._v("运行即可。")]),a._v(" "),t("p",[a._v("在科大源加持下获得了平均17.9MB/s的下载带宽！")]),a._v(" "),t("p",[a._v("然后获取源码：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("git clone https://git.openwrt.org/openwrt/openwrt.git\n")])])]),t("p",[a._v("cd进去"),t("code",[a._v("cd openwrt")])]),a._v(" "),t("p",[t("strong",[a._v("以下命令均在这个目录下执行")])]),a._v(" "),t("p",[a._v("我们要编译当前最新的发布版。")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("git checkout v21.02.1\n")])])]),t("p",[a._v("然后更新feeds：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("./scripts/feeds update -a\n./scripts/feeds install -a\n")])])]),t("h2",{attrs:{id:"_0x2-配置目标"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_0x2-配置目标"}},[a._v("#")]),a._v(" 0x2 配置目标")]),a._v(" "),t("p",[a._v("下载"),t("code",[a._v("config.buildinfo")]),a._v("并命名为"),t("code",[a._v(".config")]),a._v("：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("curl https://downloads.openwrt.org/releases/21.02.1/targets/mvebu/cortexa9/config.buildinfo -o .config\n")])])]),t("p",[a._v("下载到的"),t("code",[a._v(".config")]),a._v("是最小化的，需要将其展开：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("make defconfig\n")])])]),t("p",[a._v("按需配置编译选项")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("make menuconfig\n")])])]),t("ul",[t("li",[t("code",[a._v("[Target Profile]")]),a._v("选择WRT32X。")]),a._v(" "),t("li",[t("code",[a._v("[Build the OpenWrt Image Builder]")]),a._v("取消选择")]),a._v(" "),t("li",[t("code",[a._v("[Build the OpenWrt SDK]")]),a._v("取消选择")]),a._v(" "),t("li",[t("code",[a._v("[Advanced configuration options]")]),a._v("进去配置ccache到SSD目录上。")])]),a._v(" "),t("p",[a._v("方向键选择"),t("code",[a._v("Save")]),a._v("回车保存。再选择"),t("code",[a._v("Exit")]),a._v("退出。")]),a._v(" "),t("h2",{attrs:{id:"_0x3-首次编译"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_0x3-首次编译"}},[a._v("#")]),a._v(" 0x3 首次编译")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("time numactl -i 1 -N 1 make -j32\n")])])]),t("p",[a._v("使用CPU2及其local内存，使用32核心编译，并记录时长。")]),a._v(" "),t("p",[a._v("实际建议开个screen再编译，避免中途需要断开连接的问题：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("screen -S make_openwrt\n")])])]),t("p",[a._v("然后在screen里执行make。想撇后台可以摁"),t("code",[a._v("CTRL + A + D")]),a._v("去detach。再次来的时候"),t("code",[a._v("screen -r make_openwrt")]),a._v("即可。")]),a._v(" "),t("p",[a._v("从0编译完成共花费时长：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("real    31m39.126s\nuser    250m24.091s\nsys     35m30.852s\n")])])]),t("p",[a._v("可知：实际耗时31min19s，编译等计算类任务占用250min，加速比大概在8倍（明明32线程在跑）。另在250min中还有35min属于内核时间，调度啊IO操作之类的。")]),a._v(" "),t("h2",{attrs:{id:"_0x4-检查-vermagic"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_0x4-检查-vermagic"}},[a._v("#")]),a._v(" 0x4 检查 vermagic")]),a._v(" "),t("p",[a._v("首先获取本地编译的vermagic")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("cat ./build_dir/target-*/linux-*/linux-*/.vermagic\n")])])]),t("p",[a._v("现在对比本地编译得到的vermagic和官方值。如果一致，那就继续。不一致请检查上述步骤有无遗漏。")]),a._v(" "),t("p",[a._v("现在已经成功编译得到了和官方镜像配置一致的发布版。")]),a._v(" "),t("h2",{attrs:{id:"_0x5-nat补丁"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_0x5-nat补丁"}},[a._v("#")]),a._v(" 0x5 NAT补丁")]),a._v(" "),t("p",[a._v("这里的NAT补丁特指"),t("a",{attrs:{href:"https://github.com/Chion82/netfilter-full-cone-nat",target:"_blank",rel:"noopener noreferrer"}},[a._v("Chion82"),t("OutboundLink")],1),a._v("与"),t("a",{attrs:{href:"https://github.com/LGA1150/openwrt-fullconenat",target:"_blank",rel:"noopener noreferrer"}},[a._v("LGA1150"),t("OutboundLink")],1),a._v("的FullCone补丁，以及相关其它补丁。")]),a._v(" "),t("p",[a._v("21.02不能够使用19.07的补丁，因此补丁进行了一些小适配。")]),a._v(" "),t("h3",{attrs:{id:"打内核补丁"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#打内核补丁"}},[a._v("#")]),a._v(" 打内核补丁")]),a._v(" "),t("p",[a._v("注：该补丁适用于5.4内核，为OpenWRT21.02.1使用的版本")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("wget -P target/linux/generic/hack-5.4/ https://raw.githubusercontent.com/coolsnowwolf/lede/master/target/linux/generic/hack-5.4/952-net-conntrack-events-support-multiple-registrant.patch\n")])])]),t("h3",{attrs:{id:"添加fullconenat包"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#添加fullconenat包"}},[a._v("#")]),a._v(" 添加fullconenat包")]),a._v(" "),t("p",[a._v("下载源码。这一步直接将源码放进了代码树中。此处使用了另一个老哥patch的版本。适用于21.02")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("git clone -b master --single-branch https://github.com/llccd/openwrt-fullconenat.git package/fullconenat\n")])])]),t("p",[a._v("配置编译选项")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("make menuconfig\n")])])]),t("p",[a._v("在"),t("code",[a._v("Network -> Firewall -> iptables-mod-fullconenat")]),a._v("这个位置把该选项前面的"),t("code",[a._v("<>")]),a._v("摁两次空格改为"),t("code",[a._v("<*>")]),a._v("，意为直接编译进镜像。")]),a._v(" "),t("p",[a._v("使用方向键选择"),t("code",[a._v("Save")]),a._v("后再选择"),t("code",[a._v("Exit")]),a._v("退出")]),a._v(" "),t("h3",{attrs:{id:"添加luci补丁"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#添加luci补丁"}},[a._v("#")]),a._v(" 添加luci补丁")]),a._v(" "),t("p",[a._v("这里使用了我适配的21.02版本")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("mkdir package/network/config/firewall/patches\nwget -P package/network/config/firewall/patches/ https://raw.githubusercontent.com/SalimTerryLi/fullconenat-fw3-patch/tag-v5.4-v21.02.1/fullconenat.patch\npushd feeds/luci\nwget -O- https://raw.githubusercontent.com/SalimTerryLi/fullconenat-fw3-patch/tag-v5.4-v21.02.1/luci.patch | git apply\npopd\n")])])]),t("h3",{attrs:{id:"绕过vermagic"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#绕过vermagic"}},[a._v("#")]),a._v(" 绕过vermagic")]),a._v(" "),t("p",[a._v("对内核动了手脚，vermagic已经变了。为了能够继续使用在线软件源，需要欺骗openwrt。")]),a._v(" "),t("p",[a._v("这一步有风险，但是鉴于只添加了nat补丁而没有动其它配置，也就只能这样。")]),a._v(" "),t("blockquote",[t("p",[a._v("Use at your own risk.")])]),a._v(" "),t("p",[a._v("将之前编译得到的"),t("code",[a._v(".vermagic")]),a._v("复制出来：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("cp ./build_dir/target-*/linux-*/linux-*/.vermagic .\n")])])]),t("blockquote",[t("p",[a._v("代码树下多个编译目标时警惕，请手动清理")])]),a._v(" "),t("p",[a._v("修改内核mk中生成vermagic的代码：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("sed -i -e 's/^\\(.\\).*vermagic$/\\1cp $(TOPDIR)\\/.vermagic $(LINUX_DIR)\\/.vermagic/' include/kernel-defaults.mk\n")])])]),t("p",[a._v("再次进行编译。")]),a._v(" "),t("p",[a._v("重做"),t("code",[a._v("0x3")]),a._v("和"),t("code",[a._v("0x4")])]),a._v(" "),t("p",[a._v("在增量编译及ccache加持下，二次编译耗时：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("real    6m43.965s\nuser    71m23.656s\nsys     11m41.241s\n")])])]),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("real    4m46.815s\nuser    49m18.842s\nsys     8m51.308s\n")])])]),t("p",[a._v("因为自信ipv6没挂代理导致拖包raw.gayhub时候炸了，数据变成了两段，且不能直接叠加....")]),a._v(" "),t("p",[a._v("加速比分别是10.6和9.8")]),a._v(" "),t("h2",{attrs:{id:"_0x6-完成"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_0x6-完成"}},[a._v("#")]),a._v(" 0x6 完成")]),a._v(" "),t("p",[a._v("编译得到的系统镜像在"),t("code",[a._v("./bin/target/*/*/")])]),a._v(" "),t("h2",{attrs:{id:"_0xf-参考"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_0xf-参考"}},[a._v("#")]),a._v(" 0xf 参考")]),a._v(" "),t("p",[t("RouterLink",{attrs:{to:"/OpenWRT/manually_patch_nat1_and_build_openwrt-19.html"}},[a._v("19.07版")])],1)])}),[],!1,null,null,null);e.default=r.exports}}]);