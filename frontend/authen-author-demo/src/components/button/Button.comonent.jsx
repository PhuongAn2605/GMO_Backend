import Button from "@mui/material/Button";
import styled from "styled-components";

const ButtonStyle = styled.div`
    margin: auto;
`

const ButtonForm = (props) => {
  return (
    <ButtonStyle>
      <Button
        variant="contained"
        type={props.type}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.title}
      </Button>
    </ButtonStyle>
  );
};

export default ButtonForm;
