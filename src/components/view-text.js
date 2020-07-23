import React, { useState, useEffect, useRef } from 'react'

import styled from 'styled-components'

const Main = styled.div`
  width: 100%;
  height: 100%;
  background-color: #dadada;
  p, div {margin: 0; padding: 0;}
`
const View = styled.div`
  margin: 0 auto;
  text-align: center;
 
  /*以下遅延の指定*/
`
const isNumber = function (value) {
  return Number.isFinite(value);
};
const Int = (num) => isNumber(num) ? Math.floor(num) : 0;
const baseText = 'あいうえ'
const zero = (val) => ('00' + val).slice(-2);

/* 
# テキストエリアの縦横幅を取得
# 上記をそれぞれ標準ボックスサイズで割る
# それぞれの整数値を文字数とする
# ※当面、最小数は無視 ▶ フォントサイズ・ボックスサイズは固定
# おいおい、ボックスサイズ・フォントサイズをstore化することで
# サイズの変更が可能
*/
const BaseWidth = 36;
const BaseHeight = 20;
const FontSize = 16;
const Rows = (height) => Int(height / BaseHeight);
const Cols = (width) => Int(width / BaseWidth);
const Char = styled.span`
  display: inline-block;
  position:relative;
  text-align: center;
  width: ${BaseWidth + 'px'};
  height: ${BaseHeight + 'px'};
  font-size: ${FontSize + 'px'};
  /* box-sizing: content-box;  */
  /* border: 1px solid #ccc; */
`
const Str = styled.span`
  position:absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &.fadein {
    opacity: 0;
    animation: fadein ${props => props.speed}s ease forwards;
    animation-delay: ${props => props.delay}s;
  }
  @keyframes fadein {
      100% {  opacity: 1;}
  }
`
const Tr = styled.div`
  height: ${BaseHeight + 'px'};
`
const ViewText = () => {
  const textRef = useRef(null);
  const [size, setSize] = useState({ width: null, height: null })
  const [text, setText] = useState({})
  const setId = (rowIndex, cols, colIndex) => {
    const colRev = (cols.length - 1) - colIndex
    return zero(colRev) + '-' + zero(rowIndex);
  }
  const optimizeText = ({ height, width }) => {
    console.log(Rows(height))
    console.log(Cols(width))
    const maxRow = Rows[height]
    const maxCol = Cols[width]
    let [row, col] = [0, 0]
    const text = {}
    Array.from(baseText).map(char => {
      text[`${zero(row)}-${zero(col)}`] = char;
      return 0;
    })
    return text;
  }

  useEffect(() => {
    const resize = async function handleResize() {
      const tag = textRef.current;
      await setSize({
        height: tag.offsetHeight,
        width: tag.offsetWidth,
      })
      setText(optimizeText({
        height: tag.offsetHeight,
        width: tag.offsetWidth,
      }))
    }
    if (!size.width) resize();
    // console.log(size)
    // console.log(Rows(size.height))
    // console.log(Cols(size.width))

    window.addEventListener('resize', resize)
    return _ => {
      window.removeEventListener('resize', resize)
    }
  })
  return (
    <Main ref={textRef}>
      <View>
        {size.width && [...Array(Rows(size.height)).keys()].map((row, rowIndex) => {
          return (
            <Tr key={row} >
              {[...Array(Cols(size.width)).keys()].map((col, colIndex, c) => {
                return (
                  <Char key={col} >
                    <Str
                      className="fadein"
                      id={setId(rowIndex, c, colIndex)}
                      delay={rowIndex * 0.2}
                      speed={2}
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