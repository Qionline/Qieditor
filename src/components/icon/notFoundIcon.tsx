import React from "react"
import Lottie from "lottie-react-web"
import animationData from "@/images/lordicon/not-found.json"

const NotFoundIcon: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }
  return (
    <div style={{ marginBottom: "150px" }}>
      <Lottie options={defaultOptions} height={420 / 1.4} width={591 / 1.4} />
    </div>
  )
}

export default NotFoundIcon
