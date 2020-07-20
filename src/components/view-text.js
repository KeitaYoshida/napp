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
`
const Row = 17;
const Col = 10;
const Char = styled.span`
  display: inline-block;
  position:relative;
  text-align: center;
  width: ${props => props.width};
  height: ${props => props.height};
  font-size: 16px;
  border: 1px solid #bbb;
`
const Str = styled.span`
  position:absolute;
  top:0;
  left: 0;
`
const Tr = styled.div`
  height: ${props => props.height};
`

const ViewText = () => {
  const textRef = useRef(null);
  const [size, setSize] = useState({ width: null, height: null, boxWidth: null, boxHeight: null })

  useEffect(() => {
    const resize = function handleResize(size) {
      const tag = textRef.current;
      setSize({
        height: tag.offsetHeight,
        width: tag.offsetWidth,
        boxHeight: tag.offsetHeight / Row + 'px',
        boxWidth: tag.offsetWidth / Col + 'px',
      })
      console.log(size)
    }
    resize();

    window.addEventListener('resize', resize)
    return _ => {
      window.removeEventListener('resize', resize)
    }
  }, [])
  return (
    <Main ref={textRef}>
      <View>
        {size.boxWidth && [...Array(Row).keys()].map(row => {
          return (
            <Tr key={row} height={size.boxHeight}>
              {[...Array(Col).keys()].map(col => {
                return (
                  <Char key={col} width={size.boxWidth} height={size.boxHeight}>
                    <Str>○</Str>
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