import { Outlet } from "react-router-dom";
import { MenuBar } from "../../layout/MenuBar";
import '../Members/_index.scss';

const MemberIndex = () => {
    return (<section className="meberspage">
        <MenuBar />     
        <Outlet />
    </section>);
}
export default MemberIndex;