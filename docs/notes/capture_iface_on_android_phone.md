# 使用Wireshark实时分析安卓手机的包

## 0x0 前言

### 0x01 环境

- root了的安卓手机，系统版本影响不大，但最好AOSP
- 最好Linux的PC机，Windows应该也可但不在讨论范围内。装好wireshark
- 一根USB线

### 0x02 思路

手机和电脑USB线连接，作为通信桥梁。

手机同时开启adb与USB网络共享

手机端tcpdump抓的包管道给nc，nc通过USB网络共享发给电脑端的nc，电脑端的nc管道给wireshark

### 0x03 效果

可以不受手机端网路环境变化，稳定的抓包并在电脑的wireshark中高效分析

## 0x1 步骤

### 0x11 ENV

手机USB连接电脑，先开启USB网络共享，再去开发者选项里启用ADB。电脑自备adb工具，执行`adb shell`连接到手机。

进入adb shell后，输入`su`提权。手机上的su管理器大概要弹窗确认以下。

手机上`ifconfig`瞅瞅网络接口名称。含有`wlan`的基本是手机wifi，含有`rmnet`的基本是数据流量（安卓10）。

再在电脑上`ifconfig`或者`ip addr`。一般含有`usb`的就是共享过来的网络了。

去手机adb里ping一下电脑usb啥啥啥的ip。如果通了那就莫得问题。

### 0x12 电脑开始监听

```
nc -lp 2345 | wireshark -k -S -i -
```

### 0x13 手机端开始抓包

adb里执行（换成正确的ip，来自之前查看的usb相关网口）

```
tcpdump -s 0 -U -n -w - -i wlan0 | nc 192.168.42.168 2345
```

### 0x14 结束

0x13中新开的wireshark界面里应该已经有数据了。

