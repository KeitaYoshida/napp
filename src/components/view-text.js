/*
# テキストエリアの縦横幅を取得
# 上記をそれぞれ標準ボックスサイズで割る
# それぞれの整数値を文字数とする
# ※当面、最小数は無視 ▶ フォントサイズ・ボックスサイズは固定
# おいおい、ボックスサイズ・フォントサイズをstore化することで
# サイズの変更が可能
*/
import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
// import ViewTextRow from './view-text-row'

const baseText = 'Gatsby Cloud: the best way to build and maintain Gatsby sites'
const base = {
  speed: 1,
  delay: 0.05,
}
const Rows = (height) => int(height / BaseHeight);
const Cols = (width) => int(width / BaseWidth);
const int = (num) => Number.isFinite(num) ? Math.floor(num) : 0;
const zero = (val) => ('00' + val).slice(-2);
const toArray = (num) => [...Array(num).keys()]
const reverse = (num, len) => (len - 1) - num;
const setData = (maxRow, maxCol) => {
  const text = {}
  let [row, col, count] = [0, 0, 0]
  Array.from(baseText).map((char) => {
    text[`${zero(row)}-${zero(col)}`] = { ...base, value: char, count: count };
    if (count === 10) text[`${zero(row)}-${zero(col)}`].thema = 'thema-white'
    if (count === 10) text[`${zero(row)}-${zero(col)}`].color = 'red'
    if (count === 20) text[`${zero(row)}-${zero(col)}`].thema = 'thema-black'
    if (count === 20) text[`${zero(row)}-${zero(col)}`].color = 'blue'
    row += 1;
    count += 1;
    if (row >= maxRow) {
      row = 0;
      col += 1;
    }
    return 0;
  })
  return text;
}

const ViewText = () => {
  const textRef = useRef(null);
  const resetCell = (tar) => {
    if (!tar) return undefined
    const { offsetWidth: width, offsetHeight: height } = tar;
    const row = Rows(height)
    const col = Cols(width)
    const text = setData(row, col)
    console.log(row, { row: row, col: col, text: text });
    return { row: row, col: col, text: text };
  }
  const [thema, setThema] = useState('thema-black')
  const [cell, setCell] = useState(resetCell(textRef.current))
  const setId = (rowIndex, cols, colIndex) => zero(rowIndex) + '-' + zero(reverse(colIndex, cols))

  useEffect(() => {
    const resize = () => {
      setCell(resetCell(textRef.current))
    }
    if (!cell) resize()
    if (cell) {
      if (!cell.text) return;
      Object.keys(cell.text).map(str => {
        const tar = cell.text[str];;
        if (tar.thema) {
          const time = ((tar.count * tar.delay)) * 1000;
          setTimeout(() => setThema(tar.thema), time)
        }
        return false;
      })
    }

    window.addEventListener('resize', resize)
    return _ => window.removeEventListener('resize', resize)
  }, [cell])
  return (
    <Bg className={thema}>
      <Main ref={textRef}>
        <View>
          {cell && toArray(cell.row).map((row, rIndex) => (
            <Tr key={row} >
              {toArray(cell.col).map((col, cIndex) => {
                const tar = cell.text[setId(rIndex, cell.col, cIndex)];
                return (
                  <Char key={col} >
                    {tar &&
                      <Str
                        className="fadein"
                        color={tar.color}
                        delay={tar.count * tar.delay}
                        speed={tar.speed}
                      >
                        {tar.value}
                      </Str>
                    }
                  </Char>
                )
              }
              )}
            </Tr>
          ))}
        </View>
      </Main >
    </Bg>
  )
}

export default ViewText;

const BaseWidth = 36;
const BaseHeight = 20;
const FontSize = 16;
const Bg = styled.div`
  width: 100%;
  height: 100%;
  padding: 4rem 3rem;
  background-color: white;
  color: black;
  transition-property: background-color, color;
  transition-duration: 3s;
  &.thema-black {
    background-color: black;
    color: white;
  }
  &.thema-white {
    background-color: white;
    color: black;
  }
  p, div {margin: 0; padding: 0;}
`
const Main = styled.div`
  width: 100%;
  height: 100%;
`
const View = styled.div`
  margin: 0 auto;
  text-align: center;
`
const Char = styled.span`
  display: inline-block;
  position:relative;
  text-align: center;
  width: ${BaseWidth + 'px'};
  height: ${BaseHeight + 'px'};
  font-size: ${FontSize + 'px'};
`
const Str = styled.span.attrs(props => (
  {
    style: {
      animationDelay: props.delay + 's',
      color: props.color
    },
  }
))`
  position:absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &.fadein {
    opacity: 0;
    animation: fadein ${props => props.speed}s ease forwards;
  }
  @keyframes fadein {
      100% {  opacity: 1;}
  }
`
const Tr = styled.div`
  height: ${BaseHeight + 'px'};
`