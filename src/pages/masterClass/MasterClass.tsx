import { Button } from "../../lib/RangleUI/components";
import "./MasterClass.scss";

function MasterClassPage() {
  return (
    <>
      <div className="WindowExample layout">
        <div className="layout-block">
          <div className="layout-title">
            <Button type="icon" icon={{ name: "arrow_back" }} /> Master Class
          </div>
        </div>

        <div className="layout-block">
          <Button
            children="Chat"
            color="success"
            // onClick={handleButtonChat}
            isRipple
          />
        </div>
      </div>
    </>
  );
}
export default MasterClassPage;
