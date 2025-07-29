#!/usr/bin/bash

WALLPAPER_DIR="$HOME/photo/"
MODE="random"
HYPRCTL_CMD="hyprctl hyprpaper wallpaper"
SCREEN_NAME="HDMI-A-1"
# 检查壁纸目录
if [ ! -d "$WALLPAPER_DIR" ]; then
  echo "错误：壁纸目录不存在 $WALLPAPER_DIR"
  exit 1
fi
SAVEFILES=$IPS
IFS=$(printf '\n\b')
IMAGES=()
while IPS= read -r -d $'\0' file; do
  IMAGES+=("$file")
done < <(find "$WALLPAPER_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0)
IPS=$SAVEFILES
if [ ${#IMAGES[@]} -eq 0 ]; then
  echo "错误：目录中没有找到图片文件"
  exit 1
fi

# 选择壁纸模式
case $MODE in
"random")
  SELECTED_WALLPAPER=${IMAGES[$RANDOM % ${#IMAGES[@]}]}
  ;;
"sequential")
  STATE_FILE="$HOME/.hyprwall_index"
  INDEX=$(<"$STATE_FILE" 2>/dev/null || echo "0")
  SELECTED_WALLPAPER=${IMAGES[$INDEX]}
  INDEX=$(((INDEX + 1) % ${#IMAGES[@]}))
  echo $INDEX >"$STATE_FILE"
  ;;
*)
  echo "错误：未知模式 $MODE"
  exit 1
  ;;
esac

#Test
# 调试：输出所有找到的文件
echo "找到的图片文件："
printf "  - %s\n" "${IMAGES[@]}"
#

# 应用壁纸
echo "正在设置壁纸: ${SELECTED_WALLPAPER}"
hyprctl hyprpaper preload "$SELECTED_WALLPAPER"
eval "$HYPRCTL_CMD '$SCREEN_NAME,$SELECTED_WALLPAPER' "

notify-send "🎉wallpaper changed🎉"
