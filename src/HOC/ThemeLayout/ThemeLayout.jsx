import React, { Fragment } from 'react'
import FooterTemplate from './FooterTemplate/FooterTemplate'
import HeaderTemplate from './HeaderTemplate/HeaderTemplate'

export default function ThemeLayout(props) {
    return (
        <Fragment>
            <HeaderTemplate />
            <props.Component />
            <FooterTemplate />
        </Fragment>
    )
}
