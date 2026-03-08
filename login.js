document.getElementById('form-btn').addEventListener('click', () => {
    // 1.get input number
    const userName = document.getElementById('user-name');
    const getInputValue = userName.value;
    console.log(getInputValue);

    // 2.get pin code
    const userPass = document.getElementById('user-password');
    const userPassValue = userPass.value;
    console.log(userPassValue);

    // 3. Match both number and pin
    if (getInputValue == 'admin' && userPassValue == 'admin123') {
        alert('Successfully loged in')
        window.location.assign('./home.html')
        console.log("Okay");
    }
    else {
        alert('Invalid please enter valid information')
        return;
    }
    // inputNumber.value = '';
})