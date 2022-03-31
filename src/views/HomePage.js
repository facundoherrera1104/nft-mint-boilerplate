import React, { useState, useEffect, } from "react";
import { useWeb3React } from '@web3-react/core';

import { walletEventBus } from 'hooks';

import SweetAlert from "react-bootstrap-sweetalert";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import InputAdornment from "@material-ui/core/InputAdornment";
import Close from "@material-ui/icons/Close";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useNFTContract } from "hooks";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/homepageStyle";
const useStyles = makeStyles(styles);

export default function HomePage() {
    const classes = useStyles();
    const nFTContract = useNFTContract();

    const [ loading, setLoading ] = useState(false); 
    const [ alert, setAlert ] = React.useState(null);
    const [ mintAmount, setMintAmount ] = React.useState(1);
    const [ mintNumberState, setMintNumberState ] = React.useState('success');
    const [ maxMintAmount, setMaxMintAmount ] = React.useState(1);
    const [ walletAccount, setWalletAccount ] = React.useState(null);

    useEffect(() => {
        async function fetchData() {
            if(!nFTContract) return;
            setLoading(true);
            const maxMintAmountVal = await nFTContract.methods
                .maxMintAmount()
                .call();
            setMaxMintAmount(maxMintAmountVal);
            setLoading(false);
        }

        fetchData();
    }, [nFTContract]);
    
    const verifyNumber = value => {
        var numberRex = new RegExp("^[0-9]+$");
        if (numberRex.test(value)) {
          return true;
        }
        return false;
    };

    const hideAlert = () => {
        setAlert(null);
    };

    useEffect(() => {
        walletEventBus.on(("walletEvent"), (data) => {
            if(data.type === 'error') {
                setWalletAccount(data.message);
            } else if(data.type === 'connected') {
                setWalletAccount(data.message);
            } else if(data.type === 'disconnected') {
                setWalletAccount(null);
            }
        });
    }, []);

    const decreaseMintAmount = () => {
        if(mintAmount > 1) {
            setMintAmount(mintAmount - 1);
        }
    }

    const increaseMintAmount = () => {
        if(mintAmount < maxMintAmount) {
            setMintAmount(mintAmount + 1);
        }
    }

    const showSuccessMsg = (message) => {
        setAlert(
            <SweetAlert
              closeOnClickOutside={false}
              style={{ display: "block", marginTop: "-100px" }}
              title="Success!"
              onConfirm={() => hideAlert()}
              onCancel={() => hideAlert()}
              confirmBtnCssClass={classes.button + " " + classes.info}
              customClass="customSweetAlert"
            >
              {message}
            </SweetAlert>
        );
    };

    const showErrorMsg = (message) => {
        setAlert(
          <SweetAlert
            closeOnClickOutside={false}
            html={true}
            style={{ display: "block", marginTop: "-100px" }}
            title="Error!"
            onConfirm={() => hideAlert()}
            onCancel={() => hideAlert()}
            confirmBtnCssClass={classes.button + " " + classes.info}
            customClass="customSweetAlert"
          >
            {message}
          </SweetAlert>
        );
    };

    const mintToken = async () => {
        if(mintNumberState !== 'success' || walletAccount === null) {
            console.log('error');
            return;
        }

        setLoading(true);

        const mintAddressList = [walletAccount.toString()];

        const transaction = await nFTContract.methods
            .mint(mintAddressList, parseInt(mintAmount))
            .send({ from: walletAccount }, (error, transactionHash) => {
                if(transactionHash === undefined) {
                    setLoading(false);
                    return;
                } else {
                    console.log(transactionHash);
                }
            });

        setLoading(false);

        let successMsg = 'You purchased a token succesfully! Please check your wallet'
        if(mintAmount > 1) {
            successMsg = 'You purchased ' + mintAmount + ' tokens succesfully! Please check your wallet'
        }

        showSuccessMsg(successMsg);
    };

    return (
        <div className={classes.container}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.titleImg}>

                    </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={6} className={classes.rightBlock}>
                    <div className={classes.titleText}>
                        PLAY MORE.
                        EARN MORE.
                    </div>
                    <div className={classes.mintBlock}>
                        <div className={classes.mintCountBlock}>
                            <button type="button" className={classes.numberButton} onClick={decreaseMintAmount}>
                                -
                            </button>
                            <CustomInput
                                inputRootCustomClasses={classes.mintNumberContainer}
                                success={mintNumberState === "success"}
                                error={mintNumberState === "error"}
                                id="number"
                                value={mintAmount}
                                formControlProps={{
                                    fullWidth: true,
                                    className: classes.mintNumberInputCtrl
                                }}
                                inputProps={{
                                    onChange: event => {
                                        if (verifyNumber(event.target.value)) {
                                            setMintNumberState("success");
                                        } else {
                                            setMintNumberState("error");
                                        }
                                        setMintAmount(parseInt(event.target.value));
                                    },
                                    type: "number",
                                    endAdornment:
                                        mintNumberState === "error" ? (
                                        <InputAdornment position="end">
                                            <Close className={classes.danger} />
                                        </InputAdornment>
                                        ) : (
                                            undefined
                                        )
                                    }
                                }
                            />
                            <button type="button" className={classes.numberButton} onClick={increaseMintAmount}>
                                +
                            </button>
                        </div>
                        <div className={classes.mintButonBlock}>
                            <Button size="lg" className={classes.connectWallet} onClick={mintToken}>
                                <span>MINT</span>
                            </Button>
                        </div>
                        {alert}
                    </div>
                </GridItem>
            </GridContainer>
            { alert }
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>  
    );
};

