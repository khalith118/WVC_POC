import { FormButton } from "../common/FormButton";
import { MenuBar } from "../layout/MenuBar";
import './_index.scss';

const Index = () => {
    return (
        <section className="homepage">
            <MenuBar />
            <div className="hero-container">
                <h1 className="title">Together we can help communities lift themselves out of poverty — for good</h1>
                <div >
                    <FormButton className="form-button btn-rounded btn-xxl sticky-btn">Become a Member</FormButton>
                </div>
            </div>
        </section>
    )
}
export default Index;