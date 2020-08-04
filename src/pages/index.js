import React from "react"
// import { Link } from "gatsby"

import Layout from "@com/layout"
import ViewText from "@com/view-text"
// import Image from "@com/image"
import SEO from "@com/seo"
import styled from 'styled-components'
import formatter from '@src/utils/text-formatter'

const TextBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right:0;
  z-index: 10;
`
const text = '「ストレッチ回数」が調整でき[[{"color":"red", "actCount": 3}]]るので[[{"color":"blue", "actCount": 3, "thema":"thema-black"}]]パスワードのハッシュには良い選択肢です。つまりハードウェアのパワーを上げればハッシュの生成時間を早くすることができます。'

const IndexPage = () => {
  const textList = formatter(text)
  console.log(textList)
  return (
    <Layout>
      <SEO title="Home" />
      <TextBox>
        <ViewText textList={textList} />
      </TextBox>
    </Layout>
  )
}

export default IndexPage
