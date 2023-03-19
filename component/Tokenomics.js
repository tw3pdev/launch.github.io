import { Pie } from '@ant-design/plots';

  const Tokenomics = ({data, token}) => {
    const config = {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 1,
      innerRadius: 0.6,
      label: {
        type: 'inner',
        offset: '-50%',
        content: '',
        style: {
          textAlign: 'center',
          fontSize: 14,
        },
      },
      interactions: [
        {
          type: 'element-selected',
        },
        {
          type: 'element-active',
        },
      ],
      statistic: {
        title: false,
        content: {
          style: {
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color:'#fff'
          },
          content: token,
        },
      },
    };
    return <Pie {...config} />;
  };

  export default Tokenomics;