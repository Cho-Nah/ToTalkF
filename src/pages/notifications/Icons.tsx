import { Button, Icon } from "../../lib/RangleUI/components"

export const WarningIcon = () => {
  return (
    <Button color="warning" className="circle-indicator" type="secondary">
      <Icon
      name="warning"
      isFilled
      className="icon"
      />
    </Button>
  );
}

export const SuccessIcon = () => {
  return (
    <Button color="success" className="circle-indicator" type="secondary">
      <Icon
      name="check"
      isFilled
      className="icon"
      />
    </Button>
  );
}

export const ErrorIcon = () => {
  return (
    <Button color="error" className="circle-indicator" type="secondary">
      <Icon 
      name="close"
      isFilled
      className="icon"
      />
    </Button>
  );
}

export const PrimaryIcon = () => {
  return (
    <Button color="primary" className="circle-indicator" type="secondary">
      <Icon 
      name="exclamation"
      isFilled
      className="icon"
      />
    </Button>
  )
}

type IconProps = {
  nameIcon?: string;
}

export const CustomIcon: React.FC<IconProps> = ({nameIcon}) => {
  return (
    <Button color="error" className="circle-indicator" type="secondary">
      <Icon 
      name={nameIcon || "exclamation"}
      isFilled
      className="icon"
      />
    </Button>
  )
}