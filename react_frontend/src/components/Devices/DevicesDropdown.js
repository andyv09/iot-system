import React, {useState} from 'react';
import {Dropdown, FormControl, Button} from 'react-bootstrap';

function DevicesDropdown(props) {
    const [deviceId, setDeviceId] = useState(0);
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
        <b>Device ID: {children} &#x25bc;</b>
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
  if(props.numOfConnected <= 0){
    return(<h4>No Devices are connected</h4>)
  }
  else{
    return(
      <Dropdown onSelect={(e) => {setDeviceId(e); props.currentChanged(e)}}>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {deviceId}
        </Dropdown.Toggle>
    
        <Dropdown.Menu as={CustomMenu}>
          {[...Array(props.numOfConnected)].map((object, i) => { if(deviceId == i) return <Dropdown.Item eventKey={i} style={{color: "black"}} active>{i}</Dropdown.Item>; return <Dropdown.Item eventKey={i}>Device {i}</Dropdown.Item>})}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default DevicesDropdown
