import React, {useState} from "react";

const LandingPage = () => {

	const [selectedValue, setSelectedValue] = useState("");

	const handleSelection = (event) => {
		setSelectedValue(event.target.value);
	}

    return (
        <div>
            Experiment Tracking
        </div>

    )
}

export default LandingPage;