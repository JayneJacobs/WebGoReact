import React, { useContext } from 'react';
import styled from 'styled-components';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import { AppContext } from './AppContext.js';

const Wrapper = styled.div`
    font-family: sans-sarif;
    text-align: center;
    fort-size: 1.2rem;
`

const Pre = styled.pre`
    text-align: left;
    margin: 1em 0;
    padding: 0.5em;

    overflow: scroll;
    & .token-line {
        line-height: 1.3em;
        height: 1.3em;
}
`

const LineNo = styled.span`
    display: inline-block;
    width: 2em;
    user-select: none;
    opacity: 0.3;
`

// The following module is from  codesandbox.io/s/00o4wx0jqv
export function Prism() {
    const { prismData } = useContext(AppContext);
    return(
        <Wrapper>		
        <Highlight {...defaultProps} theme={theme} code={prismData} language="jsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Pre className={className} style={style}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  <LineNo>{i + 1}</LineNo>
                  {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
                </div>
              ))}
            </Pre>
          )}
        </Highlight>			
      </Wrapper>
  )
}