import styled from "styled-components";

const Header = () => {
  return <HeaderStyle>파칭코 시뮬레이션</HeaderStyle>;
};

const HeaderStyle = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin: 20px;
`;
export default Header;
