import styled from 'styled-components';

export const Wrapper = styled.div`
  height: calc(100vh - 60px);
  background-image: url('photo1.jpg');
  background-image: center center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`;


export const Header = styled.header`
  padding: 60px;
  background-color: rgba(233,233,233, 0.7);
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Offers = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;

`;

export const OfferCard = styled.article`
  background-color: grey;
  /* width: 300px; */
  height: 400px;
`;