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
const Rows = (height) => int(height / BaseHeight);
const Cols = (width) => int(width / BaseWidth);
const int = (num) => Number.isFinite(num) ? Math.floor(num) : 0;
const zero = (val) => ('00' + val).slice(-2);
const toArray = (num) => [...Array(num).keys()]
const reverse = (num, len) => (len - 1) - num;

const ViewText = () => {
  const textRef = useRef(null);
  const resetCell = (tar) => {
    if (!tar) return undefined
    const { offsetWidth: width, offsetHeight: height } = tar;
    return { row: Rows(height), col: Cols(width) }
  }
  const optimizeText = () => {
    if (!cell) return {}
    let [row, col] = [0, 0]
    const text = {}
    Array.from(baseText).map((char) => {
      text[`${zero(row)}-${zero(col)}`] = char;
      row += 1;
      if (row === cell.row) {
        console.log(row, cell.row)
        row = 0;
        col += 1;
      }
      return 0;
    })
    console.log(text)
    return text;
  }
  const [cell, setCell] = useState(resetCell(textRef.current))
  const [text, setText] = useState(optimizeText())
  const setId = (rowIndex, cols, colIndex) => {
    const colRev = (cols.length - 1) - colIndex
    return zero(rowIndex) + '-' + zero(colRev);
  }
  const setDelay = (rows, rowIndex, cols, colIndex) => {
    const reverseColNum = reverse(colIndex, cols.length)
    return (rows * reverseColNum) + rowIndex;
  }

  useEffect(() => {
    const resize = () => {
      setCell(resetCell(textRef.current))
      setText(optimizeText())
    }
    if (!cell) {
      console.log('no')
      resize()
    }

    window.addEventListener('resize', resize)
    return _ => {
      window.removeEventListener('resize', resize)
    }
  })
  return (
    <Main ref={textRef}>
      <View>
        {cell && toArray(cell.row).map((row, rowIndex) => {
          return (
            <Tr key={row} >
              {toArray(cell.col).map((col, colIndex, c) => {
                return (
                  <Char key={col} >
                    <Str
                      className="fadein"
                      id={setId(rowIndex, c, colIndex)}
                      delay={setDelay(cell.height, rowIndex, c, colIndex) * 0.05}
                      speed={1}
                    >
                      {text[setId(rowIndex, c, colIndex)]}
                    </Str>
                  </Char>
                )
              })}
            </Tr>
          )
        })
        }
      </View>
    </Main>
  )
}

export default ViewText;

const BaseWidth = 36;
const BaseHeight = 20;
const FontSize = 16;
const Main = styled.div`
  width: 100%;
  height: 100%;
  background-color: #dadada;
  p, div {margin: 0; padding: 0;}
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
const Str = styled.span.attrs(props => ({ style: { animationDelay: props.delay + 's' } }))`
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