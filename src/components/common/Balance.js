import BN from 'bn.js';
import React from 'react';
import { Translate } from 'react-localize-redux';
import styled from 'styled-components';

import { 
    formatNearAmount,
    showInYocto,
    YOCTO_NEAR_THRESHOLD
} from '../../utils/balance';
import classNames from '../../utils/classNames';
import NEARBalanceInUSDWrapper from './near_usd/NEARBalanceInUSDWrapper';

const StyledContainer = styled.div`
    white-space: nowrap;
    line-height: normal;

    .dots {
        color: #4a4f54;
        margin: 0 12px 0 0;

        :after {
            content: '.';
            animation: link 1s steps(5, end) infinite;

            @keyframes link {
                0%, 20% {
                    color: rgba(0,0,0,0);
                    text-shadow:
                        .3em 0 0 rgba(0,0,0,0),
                        .6em 0 0 rgba(0,0,0,0);
                }
                40% {
                    color: #4a4f54;
                    text-shadow:
                        .3em 0 0 rgba(0,0,0,0),
                        .6em 0 0 rgba(0,0,0,0);
                }
                60% {
                    text-shadow:
                        .3em 0 0 #4a4f54,
                        .6em 0 0 rgba(0,0,0,0);
                }
                80%, 100% {
                    text-shadow:
                        .3em 0 0 #4a4f54,
                        .6em 0 0 #4a4f54;
                }
            }
        }
    }

    &.subtract {
        .near-amount {
            :before {
                content: '-'
            }
        }
    }

    .fiat-amount {
        color: #A2A2A8;
        font-weight: 400;
        margin-top: 2px;
        font-size: 13px;
    }
`;

const Balance = ({
    amount,
    symbol = true,
    className,
    includeBalanceinFiat = true,
    showAmountAsSubtracted // See comment below
}) => {

    const amountoShow = amount && formatNearAmount(amount);
    const NEARSymbol = 'NEAR';

    const handleShowInYocto = (amount) => {
        if (new BN(amount).lte(YOCTO_NEAR_THRESHOLD)) {
            return showInYocto(amount);
        } else {
            return '';
        }
    };

    return (
        <StyledContainer title={handleShowInYocto(amount)} className={classNames(['balance', className, {'subtract' : showAmountAsSubtracted}])}>
            {amount
                ? <div className='near-amount'>{amountoShow}{symbol !== false ? ` ${NEARSymbol}` : ``}</div>
                : <div className="dots"><Translate id='loadingNoDots'/></div>
            }
            {includeBalanceinFiat &&
                <div className='fiat-amount'>
                    <NEARBalanceInUSDWrapper
                        amount={amount}
                    />
                </div>
            }
        </StyledContainer>
    );
};

export default Balance;

// showAmountAsSubtracted adds a minus sign in front of the formatted NEAR amount (amountoShow)
// to indicate that the amount is being deducted, e.g. 0.2 NEAR -> -0.2 NEAR
