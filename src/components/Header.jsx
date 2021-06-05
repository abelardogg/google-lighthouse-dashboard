export default function Header(){
    return <>
        <div id="header" className="d-flex justify-content-between align-items-center px-4">
            <h1>Lighthouse charts</h1>
            <h6>v0.1</h6>
        </div>
        <div id="app-description" className="container">
            <div className="row">
                <div className="col-12">
                    <p>This is a dashboard where you can track google lighthouse metrics of a webpage.</p>
                </div>
            </div>
        </div>
    </>;
} 