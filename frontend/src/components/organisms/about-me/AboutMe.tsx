import { Button } from 'components/atoms/button/Button';
import { Paragraph } from 'components/atoms/paragraph/Paragraph';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BasicTemplate } from 'templates/BasicTemplate';
import laptop from 'images/laptop.png';
import profile2 from 'images/profile2.png';
import { Heading } from 'components/atoms/heading/Heading';
import axios from 'axios';
import css from 'images/technology-icon/css.png';
import html from 'images/technology-icon/html.png';
import js from 'images/technology-icon/js.png';
import react from 'images/technology-icon/react.png';
import ts from 'images/technology-icon/ts.png';

const Wrapper = styled.div`
  margin-top: 15vh;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10vh;
  position: relative;
`;

const Image = styled.img`
  object-fit: contain;
  margin-top: -370px;
  box-shadow: none;
  position: absolute;
  right: -100px;
`;

const Description = styled.div`
  height: 50vh;
  width: 42.5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  align-items: flex-start;
  text-align: justify;
`;

const StyledButton = styled(Button)`
  margin: 10px 30px 10px 0px;
  max-width: 30vh;
  text-align: center;
  transition: 0.8s all ease;
  &:hover {
    opacity: 0.7;
  }
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;

const StyledParagraph = styled(Paragraph)`
  line-height: 2.7rem;
  padding-right: 0px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 70px;
  margin-bottom: 150px;
`;

export const AboutMe = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const GetData = async () => {
      try {
        const lang = navigator.language === 'en' || navigator.language === 'pl' ? navigator.language : 'en';
        const res = await axios({ url: `./locales/${lang}/AboutMe.json` });
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    GetData();
  }, []);
  return (
    <BasicTemplate index={1} id="about-me" backgroundColorStyle="black">
      <>
        <Wrapper>
          {data && (
            <Description>
              <Heading bold>{data.title}</Heading>
              <StyledParagraph bold light>
                {data.descriptionTop}
              </StyledParagraph>
              <StyledParagraph style={{ marginRight: 40 }} light>
                {data.description}
              </StyledParagraph>
              <Bottom>
                <StyledButton other href={process.env.PUBLIC_URL + `/data/${data.cvLink}`} target="_blank">
                  {data.cvButton}
                </StyledButton>
              </Bottom>
            </Description>
          )}
          <Image draggable={false} src={laptop} alt={laptop} />
        </Wrapper>
        <Row>
          <img style={{ flex: 1 }} src={profile2} />
          <div style={{ flex: 1 }}>
            <Heading bold>Main skills</Heading>
            <div style={{ display: 'flex', gap: 60, marginTop: 40 }}>
              <img src={react} />
              <img src={js} />
              <img src={ts} />
              <img src={css} />
              <img src={html} />
            </div>
            <Heading style={{ marginTop: 40, marginBottom: 20 }} bold>
              Other skills
            </Heading>
            <StyledParagraph big light bold>
              <ul style={{ listStyle: 'square', marginLeft: 30 }}>
                <li>Express</li> <li>MongoDB</li> <li>MySQL</li> <li>GIT</li> <li>Docker</li>
              </ul>
            </StyledParagraph>
          </div>
        </Row>
      </>
    </BasicTemplate>
  );
};
