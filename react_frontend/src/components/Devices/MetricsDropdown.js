import React, {useState} from 'react';
import {Dropdown, FormControl, Button} from 'react-bootstrap';

function MetricsDropdown(props) {
    const [metric, setMetric] = useState("engine_temperature");
    // The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <Button
        className="mt-4" variant="outline-primary"
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        >
        <b>{children}&#x25bc;</b>
        </Button>
    ));
  
  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );
  return(
      <Dropdown onSelect={(e) => {setMetric(e); props.currentChanged(e)}}>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {metric}
        </Dropdown.Toggle>
    
        <Dropdown.Menu as={CustomMenu}>
            <Dropdown.Item eventKey="engine_temperature">Engine Temperature</Dropdown.Item>
            <Dropdown.Item eventKey="oil_temperature">Oil Temperature</Dropdown.Item>
            <Dropdown.Item eventKey="intakeAirTemperature">Intake Air Temperature</Dropdown.Item>
            <Dropdown.Item eventKey="intakeAirFlowSpeed">Intake Air Flow Speed</Dropdown.Item>
            <Dropdown.Item eventKey="tirePressure">Tire Pressure</Dropdown.Item>
            <Dropdown.Item eventKey="totalDistance">Total Distance</Dropdown.Item>
            <Dropdown.Item eventKey="batteryPercentage">Battery Percentage</Dropdown.Item>
            <Dropdown.Item eventKey="accelometerValue">Accelometer Value</Dropdown.Item>
            <Dropdown.Item eventKey="location">Location</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
}

export default MetricsDropdown
