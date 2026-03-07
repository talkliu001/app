# 生成 Android APK（仅 Android，不做 iOS）

## 当前状态

- **JDK 17**：已放在项目内 `jdk-17.0.18+8`（Eclipse Temurin），无需再单独安装 Java。
- **Android SDK**：本机若未安装，需先安装 **Android Studio**（推荐）或 Android 命令行工具，并配置 SDK 路径。

## 一、安装 Android Studio（未安装时）

1. **下载安装包（任选其一）：**
   - 官方页面：https://developer.android.com/studio  
   - 直接下载 .exe（约 1.4 GB）：  
     https://edgedl.me.gvt1.com/android/studio/install/2025.3.2.6/android-studio-panda2-windows.exe  
   - 若已通过脚本/助手下载，安装包可能在：`%TEMP%\android-studio-panda2-windows.exe`，下载完成后双击运行即可。
2. 运行安装程序，安装时勾选 **Android SDK**、**Android SDK Platform**、**Android Virtual Device**。
3. 安装完成后，记下 SDK 路径，一般为：
   - `C:\Users\你的用户名\AppData\Local\Android\Sdk`  
   即 `%LOCALAPPDATA%\Android\Sdk`

## 二、配置 SDK 路径（二选一）

**方式 A：设置环境变量（推荐）**

- 系统环境变量中新增：
  - 变量名：`ANDROID_HOME`
  - 变量值：`C:\Users\你的用户名\AppData\Local\Android\Sdk`（按实际路径修改）
- 在 Path 中增加：`%ANDROID_HOME%\platform-tools`

**方式 B：使用 local.properties**

- 在项目下的 `android` 目录中新建 `local.properties`（若不存在），内容一行：
  - `sdk.dir=C:\\Users\\你的用户名\\AppData\\Local\\Android\\Sdk`
- 路径中的反斜杠要写成双反斜杠 `\\`。

## 三、执行打包

项目路径**含中文**（如「休学分析」「厌学检测」）时，建议用**虚拟盘符**再打包，避免编码问题：

1. **打开新的「命令提示符」或 PowerShell（以管理员运行一次 subst 时可能需要）。**

2. **创建虚拟盘符（仅需执行一次，重启后失效）：**
   ```bat
   subst Z: "e:\休学分析\厌学检测-app"
   ```

3. **在 Z: 下打包：**

   **若使用 CMD（命令提示符）：**
   ```bat
   Z:
   cd Z:\android
   set JAVA_HOME=Z:\jdk-17.0.18+8
   .\gradlew.bat assembleRelease --no-daemon
   ```

   **若使用 PowerShell：** 必须用 `$env:JAVA_HOME` 设置环境变量（`set` 在 PowerShell 中无效）：
   ```powershell
   Z:
   cd Z:\android
   $env:JAVA_HOME = "Z:\jdk-17.0.18+8"
   .\gradlew.bat assembleRelease --no-daemon
   ```
   （若已用 local.properties 配置了 SDK，无需再设 ANDROID_HOME。）

4. **生成结果：**
   - APK 位置：`Z:\android\app\build\outputs\apk\release\app-release.apk`
   - 可复制到 `e:\休学分析\厌学检测-app\厌学检测-app-release.apk` 使用。

若项目路径**不含中文**，可直接在项目根目录执行：

```bat
build-android.bat
```

（脚本会自动使用项目内 `jdk-17.0.18+8`；需已设置 `ANDROID_HOME` 或已配置 `android\local.properties`。）

## 四、说明

- 当前使用 **debug 签名** 打 release 包，仅便于安装测试；上架应用商店需自建 keystore 并配置 `android/app/build.gradle` 的 `signingConfigs.release`。
- 本仓库只生成 **Android APK**，不包含 iOS 工程或构建步骤。
