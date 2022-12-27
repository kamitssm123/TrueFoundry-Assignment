import React from "react";
import { MdOutlineError } from 'react-icons/md'
import ThemeContext from "../../theme/themeContext";
import './style.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <ThemeContext.Consumer>
          {
            theme => (
              <div className="fallback-ui-wrapper" style={{backgroundColor: theme.colors.backgroundSecondary}}>
                <MdOutlineError size={50} color={theme.colors.error} />
                <div className="fallback-ui-text" style={{color: theme.colors.text}}>Something went wrong, please refresh the application.</div>
              </div>
            )
          }
        </ThemeContext.Consumer>
      );
    }
    return this.props.children; 
  }
}

export default ErrorBoundary;