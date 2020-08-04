const defDelay = 0.07;
const textDef = {
  thema: 'thema-white',
  speed: 1,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  rotate: 0,
  weight: 'nomal'
}

const setOption = (char) => {
  const tmp = {}
  if (char == 'ー') {
    tmp.value = '｜'
  }
  const deg90s = ['「', '」',]
  const deg180s = ['。', '、']
  if (deg90s.indexOf(char) != -1) tmp.rotate = 90;
  if (deg180s.indexOf(char) != -1) tmp.rotate = 180;
  return tmp
};

const formatter = (text) => {
  const getEd__getDoubleKakuKakko = (str) => {
    const target = ']]'
    return str.indexOf(target);
  }
  const stCount = '[['.length;
  const edCount = '[[]]'.length;
  let skip = 0;
  let actCount = 0;
  let action = {}
  let elseCount = 0;
  let thema = {};
  return text.split("").reduce((act, tar, index, origin) => {
    if (tar === '[' && origin[index + 1] === '[') {
      const st = index + stCount;
      const ed = getEd__getDoubleKakuKakko(text.slice(st))
      const style = JSON.parse(text.slice(st, st + ed))
      if (style.thema) thema = { thema: style.thema }
      actCount = style.actCount;
      action = { ...style }
      skip = ed + stCount + 1;
      elseCount += ed + edCount
    } else {
      if (skip === 0) {
        const option = setOption(tar)
        const delay = (index - elseCount) * defDelay;
        let set = { ...textDef, value: tar, count: index, ...option, delay: delay, ...thema }
        if (actCount > 0) {
          set = { ...set, ...action }
          actCount -= 1;
        }
        act.push(set)
      } else {
        skip -= 1;
      }
    };
    return act
  }, [])
}

export default formatter;