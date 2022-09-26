import React from "react";
import "../Pages/ReadData.css";
import Navbar from "../../src/Components/Navbar";
const EnterData = () => {
    return (
        <div>
            <Navbar />
            <div class="container">
                <table class="data_table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Seller</th>
                            <th>Details</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2022-09-10</td>
                            <td>Maxima</td>
                            <td>PIRKINYS 516793******5265</td>
                            <td>20.02 EUR</td>
                        </tr>

                        <tr>
                            <td>2022-09-10</td>
                            <td>CRCLE K ORO UOSTAS</td>
                            <td>PIRKINYS 5166578******5265</td>
                            <td>32.54 EUR</td>
                        </tr>

                        <tr>
                            <td>2022-09-10</td>
                            <td>Maxima</td>
                            <td>PIRKINYS 516793******5265</td>
                            <td>20.02 EUR</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}
export default EnterData;