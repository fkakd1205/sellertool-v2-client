import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
`;

export const Wrapper = styled.div`
    border: 1px solid #f0f0f0;
    background: #fff;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: var(--defaultBoxShadow);
`;

export const TitleContainer = styled.div`
    background: var(--defaultGrayColor);
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title{
        font-size: 18px;
        font-weight: 500;
    }

    .button-item{
        margin:0;
        padding:0;
        width:32px;
        height: 32px;
        border:none;
        background: none;
    }
`;

export const ItemListContainer = styled.div`
    padding: 0 20px;
`;

export const ItemBox = styled.div`
    padding: 20px 0;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:last-child{
        border-bottom: none;
    }

    .name{
        font-size: 16px;
        color: #404040;
        margin-bottom: 3px;
    }

    .description{
        font-size: 12px;
        color: #606060;
    }

    .icon-button-item{
        margin:0;
        padding:0;
        width:24px;
        height: 24px;
        border:none;
        background: none;
    }
`;