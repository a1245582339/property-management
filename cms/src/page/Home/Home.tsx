import { Pie } from '@ant-design/plots'

const Home: React.FC = () => {
  const [occupancy, setOccupancy] = useSate()
  return (
    <>
      <div className="occupancy-rate">
        {/* 入住率 */}
        <Pie
          {...{
            appendPadding: 10,
            data: occupancy,
            angleField: 'value',
            colorField: 'type',
            radius: 0.8,
            label: {
              type: 'outer',
              content: '{name} {percentage}',
            },
            interactions: [
              {
                type: 'pie-legend-active',
              },
              {
                type: 'element-active',
              },
            ],
          }}
        />
      </div>
    </>
  )
}
export default Home
function useSate(): [any, any] {
  throw new Error('Function not implemented.')
}
