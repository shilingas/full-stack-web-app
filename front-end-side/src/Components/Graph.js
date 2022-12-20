import { XAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
const Graph = props => {

    const toolTipSyle = {
        backgroundColor: '#2e3542',
    };

    function toMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        if (monthNumber === "") {
            return "Your total";
        } else {
            return date.toLocaleString('en-US', {
                month: 'long',
            });
        }
    }

    return (
        <BarChart
            width={535}
            height={300}
            data={props.graphData}
        >

            <defs>
                <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0067ad" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#0067ad" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="colorGrey" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#96a5af" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#96a5af" stopOpacity={0.15} />
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="5 10" stroke="#798395" />
            <XAxis dataKey="name" stroke="#798395" />
            <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.1)', strokeWidth: 2 }} contentStyle={toolTipSyle} labelFormatter={x => x + " expenses"} formatter={(value, name, props) => [value + "%", name]} />

            {props.type === "1" ?
                <>
                    <Bar type="monotone" dataKey="Month1" name={toMonthName(props.date.slice(5, 7) - 1)} stroke="#96a5af" fillOpacity={1} fill="url(#colorGrey)" />
                    <Bar type="monotone" dataKey="Month2" name={toMonthName(props.date.slice(5, 7))} stroke="#0067ad" fillOpacity={1} fill="#0067ad" />
                </>
                :
                <>
                    <Bar type="monotone" dataKey="PreviousYear" name={props.date.slice(0, 4) - 1 + " " + toMonthName(props.date.slice(5, 7))} stroke="#96a5af" fillOpacity={1} fill="url(#colorGrey)" />
                    <Bar type="monotone" dataKey="Month2" name={props.date.slice(0, 4) + " " + toMonthName(props.date.slice(5, 7))} stroke="#0067ad" fillOpacity={1} fill="#0067ad" />
                </>}
        </BarChart>
    );
}

export default Graph;