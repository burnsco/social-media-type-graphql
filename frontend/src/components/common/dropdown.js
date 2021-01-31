import CustomButton from "../CustomButton"

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
`
export const CartDropdownButton = styled(CustomButton)`
  margin-top: auto;
`
export const EmptyMessageContainer = styled.span`
  font-size: 1em;
  margin: 50px auto;
`
export const CartItemsContainer = styled.div`
  height: 20em;
  display: flex;
  flex-direction: column;
  overflow: auto;
`