import { Spin } from "antd"

export const SpinCustom = ({isLoading = false}) => {
    const containerSpinStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', 
        zIndex: 1000, 
      };

    return  isLoading ? (
        <div style={{...containerSpinStyle, position: 'fixed'}}>
            <Spin size="default" />
        </div>
    ) : <></>

}