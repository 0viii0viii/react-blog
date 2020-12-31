import React, { useState } from 'react';
import {} from 'reactstrap';

const LoginModal =() => {
    const [modal, setModal] = useState(false);
    const [localMsg, setLocalMsg] = useState(' ')
    const [form, setValues] = useState({
        email: "",
        password: ""
    })
};

export default LoginModal;