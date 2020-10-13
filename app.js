//https://net-comber.com/charset.html

const resultEl=document.getElementById("result");
const lengthEl=document.getElementById("length");
const uppercaseEl=document.getElementById("uppercase");
const lowercaseEl=document.getElementById("lowercase");
const numbersEl=document.getElementById("numbers");
const symbolsEl=document.getElementById("symbols");
const generateEl=document.getElementById("generate");
const clipboardEl=document.getElementById("clipboard")

const randomFunc={
	lower:getRandomLower,
	upper:getRandomUpper,
	number:getRandomNumber,
	symbol:getRandomSymbol
}

generateEl.addEventListener("click",function(){
	const length=parseInt(lengthEl.value);
	const hasLower=lowercaseEl.checked;
	const hasUpper=uppercaseEl.checked;
	const hasNumber=numbersEl.checked;
	const hasSymbol=symbolsEl.checked
	// console.log(hasLower,hasUpper,hasNumber,hasSymbol)
	resultEl.innerHTML=
	generatePassword(hasLower,hasUpper,hasNumber,hasSymbol,length)
})

function generatePassword(lower,upper,number,symbol,length){
	let generatedPassword='';
	const typeCount= lower+upper+number+symbol;
	console.log("typeCount",typeCount)
	const typeArr=[{lower},{upper},{number},{symbol}].filter(function(item){
		return Object.values(item)[0]
	})
	console.log(typeArr)
	if(typeCount==0){
		return;
	}
	for(let i=0;i<length;i=i+typeCount){
		typeArr.forEach(function(type){
			const funcName=Object.keys(type)[0];
			generatedPassword+=randomFunc[funcName]();
		})
	}
	const finalPassword=(generatedPassword.slice(0,length));
	return finalPassword
}

clipboardEl.addEventListener("click",function(){
	const textarea=document.createElement("textarea");
	const password=resultEl.innerHTML;
	if(!password){
		return
	}
	textarea.value=password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert("password copied to clipboard")
})

function getRandomLower(){
	return String.fromCharCode(Math.floor(Math.random()*26)+97)
}
function getRandomUpper(){
	return String.fromCharCode(Math.floor(Math.random()*26)+65)
}
function getRandomNumber(){
	return String.fromCharCode(Math.floor(Math.random()*10)+48)
}
function getRandomSymbol(){
	const symbols=`!@#$%^&*(){}[]=<>/,.`;
	return symbols[Math.floor(Math.random()*symbols.length)]
}