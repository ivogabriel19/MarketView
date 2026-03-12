export default function Metric({label,value}){

  return (
    <div>
      <div style={{fontSize:"12px",opacity:0.6}}>
        {label}
      </div>

      <div style={{fontWeight:"bold"}}>
        {value}
      </div>
    </div>
  )
}