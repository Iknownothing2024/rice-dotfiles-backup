#!/usr/bin/env bash

# 1. 定义壁纸目录
WALLPAPER_DIR="/home/archguy/photo"

# 2. 扫描支持的图片格式 (jpg, jpeg, png) 并存入数组
# 使用 find 避免处理空格路径时出错
mapfile -t WALLPAPERS < <(find "$WALLPAPER_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \))

# 3. 检查目录是否为空
if [ ${#WALLPAPERS[@]} -eq 0 ]; then
  echo "错误：在 $WALLPAPER_DIR 中没找到图片。"
  exit 1
fi

# 4. 打印列表（方便调试查看）
echo "找到以下壁纸："
printf '%s\n' "${WALLPAPERS[@]}"
echo "--------------------------------"

# 5. 随机抽取一张
RANDOM_WALLPAPER="${WALLPAPERS[$RANDOM % ${#WALLPAPERS[@]}]}"

# 6. 执行更换命令
echo "正在应用壁纸: $RANDOM_WALLPAPER"
hyprctl hyprpaper wallpaper ",$RANDOM_WALLPAPER"

# 7. (可选) 如果你希望下次启动还用这张，可以顺便更新一下配置文件，或者直接靠这个脚本启动
