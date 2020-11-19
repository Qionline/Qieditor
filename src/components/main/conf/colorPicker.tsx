import React from "react"
import "./colorPicker.less"

interface ColorPickerProps {
  color: string
  onChangeComplete: (color: string) => any
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChangeComplete }) => {

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeComplete("#" + e.target.value)
  }

  return (
    <div className="ColorPicker-cls">
      <span style={{ backgroundColor: color }} className="ColorPicker-cls-show-box"></span>
      <div className="ColorPicker-cls-input">
        <span className="ColorPicker-cls-input-place">#</span>
        <input type="text" value={color.split("#")[1]} onChange={handleChangeColor} />
      </div>
    </div>
  )
}

export default ColorPicker
