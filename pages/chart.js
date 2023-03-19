import { ResponsivePie } from "@nivo/pie";



function SymbolTriangle({
    fill,
    opacity = 1,
    borderWidth = 0,
    borderColor = 'transparent',
  }) {
    return (

        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"  opacity={opacity}
  strokeWidth={borderWidth}
  stroke={borderColor}
  style={{
    pointerEvents: 'none',
  }}>
<rect x="10.7686" y="1" width="15.6506" height="15.6506" rx="1.67685" transform="rotate(45 10.7686 -0.0195312)" fill={fill}/>
</svg>
    )
  }


  
const WeLaunchCharts = ({ data,name }) => (
    <>
  <ResponsivePie
    data={data}
    colors={{ datum: 'data.color' }}
    margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
    innerRadius={0.7}
    padAngle={0}
    cornerRadius={0}
    activeOuterRadiusOffset={8}
    enableArcLinkLabels={false}
    borderWidth={0}
    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
    enableArcLabels={false}
    
    legends={[
        {
            anchor: 'left',
            direction: 'column',
            justify: false,
            translateX: 1,
            translateY: 20,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 35,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 20,
            symbolShape: SymbolTriangle,
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#fff'
                    }
                }
            ]
        }
    ]}
  />
  <div className="ov-1">
      <span className="text-uppercase ov-2">{name}</span>
    </div>
  </>
);

export default WeLaunchCharts;