import React, { useState, useEffect, } from "react";
// import { useDispatch, } from 'react-redux';

import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected,  } from '@web3-react/injected-connector'
import { injected } from 'utils/connectors';
import { useEagerConnect, useInactiveListener, walletEventBus } from 'hooks';

// import LockOpen from "@material-ui/icons/LockOpen";
import Lock from "@material-ui/icons/Lock";

// SweetAlert
// import SweetAlert from "react-bootstrap-sweetalert";
import Button from "components/CustomButtons/Button.js";

// import { WalletConnectAction, WalletDisconnectAction, } from 'redux/actions/WalletActions';
import * as ActionTypes from 'redux/ActionTypes';

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/components/connectWalletStyle.js";
const useStyles = makeStyles(styles);

export default function ConnectButton() {
    const classes = useStyles();

    const { connector, chainId, account, activate, deactivate, active, error } = useWeb3React();
    const [ activatingConnector, setActivatingConnector ] = useState(null);
    const [ alert, setAlert ] = React.useState(null);

    const getErrorMessage = (error) => {
        if (error instanceof NoEthereumProviderError) {
            return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
        } else if (error instanceof UnsupportedChainIdError) {
            return "You're connected to an unsupported network.";
        } else if (error instanceof UserRejectedRequestErrorInjected) {
            return 'Please authorize this website to access your Ethereum account.';
        } else {
            return 'An unknown error occurred. Check the console for more details.';
        }
    };

    const hideAlert = () => {
        setAlert(null);
    };

    // const showErrorMsg = (message) => {
    //     setAlert(
    //       <SweetAlert
    //         closeOnClickOutside={false}
    //         html={true}
    //         style={{ display: "block", marginTop: "-100px" }}
    //         title="Error!"
    //         onConfirm={() => hideAlert()}
    //         onCancel={() => hideAlert()}
    //         confirmBtnCssClass={classes.button + " " + classes.info}
    //         customClass="customSweetAlert"
    //       >
    //         {message}
    //       </SweetAlert>
    //     );
    // };

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);

    useEffect(() => {
        if(!!error) {
            const errMsg = getErrorMessage(error);
            walletEventBus.dispatch("walletEvent", { type: 'error', message: errMsg });
        }
    }, [error]);

    useEffect(() => {
        if(active && account && account.length > 0 && chainId) {
            walletEventBus.dispatch("walletEvent", { type: 'connected', message: account });
        } else {
            deactivate();
            walletEventBus.dispatch("walletEvent", { type: 'disconnected', message: account });
        }  
    }, [active, account, chainId]);

    const handleConnect = async (e) => {
        if(!active) {
            setActivatingConnector(injected);
            await activate(injected);
        } else {
            deactivate();
        }        
    };    

    const showWalletAddress = (str) => {
        return str.substring(0, 6) + '...' + str.substring(str.length-4);
    };

    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect();

    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector);

    return (
        <>
            <Button size="lg" className={classes.connectWallet} onClick={handleConnect}>
                { account && active ? (
                    <>
                        { showWalletAddress(account) }
                    </>) : (
                    <>
                        <Lock className={classes.listItemIcon} />
                        <span>CONNECT WALLET</span>
                    </>)
                }
            </Button>
            {alert}
        </>
    )
}