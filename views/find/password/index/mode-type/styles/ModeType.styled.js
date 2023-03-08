import styled from 'styled-components';
import CustomBlockButton from '../../../../../../components/buttons/block-button/v1/CustomBlockButton';

export const Container = styled.div`
    overflow: hidden;
`;

export const LogoBox = styled.div`
    width: 50px;
    height: 50px;
    margin-top: 80px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    overflow: hidden;
`;

export const Wrapper = styled.div`
    border: 1px solid #f0f0f0;
    border-radius: 15px;
    background: white;
    box-shadow: var(--defaultBoxShadow);
    width: 600px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    margin-bottom: 50px;
    padding: 20px;

    @media all and (max-width: 992px){
        width: 90%;
    }

    .title{
        color: #404040;
    }
`;

export const ItemBox = styled(CustomBlockButton)`
    padding: 30px 20px;
    height: auto;
    font-size: 16px;
    border: 1px solid #f0f0f0;
    color: #404040;
    font-weight: 500;
    margin-top: 20px;
    border-radius: 5px;
    text-align: left;

    &:hover{
        box-shadow: var(--defaultBoxShadow);
    }
`;

export const Others = styled.div`
    margin-top: 40px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 13px;
    color: #505050;
`;