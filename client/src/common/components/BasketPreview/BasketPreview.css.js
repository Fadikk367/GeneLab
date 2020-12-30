import styled from 'styled-components';
import { BlockLink } from 'common/components';

export const PreviewContainer = styled(BlockLink)`
  position: relative;
  background-color: #15857e;
  color: white;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  cursor: pointer;
`;

export const ProductsCount = styled.span`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  line-height: 22px;
  text-align: center;
  display: block;
  position: absolute;
  top: 5px;
  right: 5px;

  background-color: red;
  color: white;
`;