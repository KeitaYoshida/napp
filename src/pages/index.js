import React from "react"
// import { Link } from "gatsby"

import Layout from "@com/layout"
import ViewText from "@com/view-text"
// import Image from "@com/image"
import SEO from "@com/seo"
import styled from 'styled-components'

const TextBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right:0;
  padding: 4rem 3rem;
  z-index: 10;
  background-color: #f0f0f0;
`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <TextBox>
      <ViewText />
    </TextBox>
  </Layout>
)

export default IndexPage
