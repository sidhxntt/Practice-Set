import { Outlet } from "react-router-dom"

export default function CareersLayout() {
  return (
    <div className="careers-layout">
      <h2>Careers</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse incidunt quas illum consectetur similique adipisci dolorem voluptate! Accusantium, dignissimos vitae, rem, possimus ipsam enim consequuntur a quis magni aliquam accusamus!</p>
      
      <Outlet />
    </div>
  )
}