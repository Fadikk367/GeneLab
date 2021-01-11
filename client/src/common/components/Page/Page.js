import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px 40px;
  max-width: ${props => props.maxWidth + 'px' || '100%'};
`;