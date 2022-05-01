// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js";
import { getFirestore, collection, doc, addDoc, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "API KEY",
	authDomain: "DOMAIN",
	projectId: "PROJECT ID",
	storageBucket: "STOREAGE BUCKET",
	messagingSenderId: "SENDER ID",
	appId: "APP ID",
	measurementId: "MEASUREMENT ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const usersCollection = collection(db, "users");

$(document).ready(async () => {
	const tableBody = document.querySelector("#tableBody");
	//ALL RECORDS SHOW
	let results = await getDocs(usersCollection);
	results.docs.forEach((doc) => {
		let data = doc.data();
		let row = `
                <tr id="${doc.id}">
                    <td>${data.firstname} ${data.lastname}</td>
                    <td>${data.email}</td>
                    <td>${data.contact}</td>
                    <td class="center">
                    <a class="btn-floating btn waves-effect waves-light red deleteBtnCls" data-id="${doc.id}">
                        <i class="material-icons">delete</i>
                    </a>
                    </td>
                </tr>`;
		tableBody.insertAdjacentHTML("beforeend", row);
	});

	//SUBMIT BUTTON
	$("#submitBtn").click(() => {
		let fName = $("#first_name").val();
		let lName = $("#last_name").val();
		let email = $("#email").val();
		let contact = $("#contact").val();
		if (fName && lName && email && contact) {
			let data = {
				firstname: fName,
				lastname: lName,
				email: email,
				contact: contact,
			};
			addDoc(usersCollection, data)
				.then((docRef) => {
					let row = `
                    <tr id="${docRef.id}">
                        <td>${data.firstname} ${data.lastname}</td>
                        <td>${data.email}</td>
                        <td>${data.contact}</td>
                        <td class="center">
                        <a class="btn-floating btn waves-effect waves-light red deleteBtnCls" data-id="${docRef.id}">
                            <i class="material-icons">delete</i>
                        </a>
                        </td>
                    </tr>`;
					tableBody.insertAdjacentHTML("beforeend", row);
					$("#first_name").val("");
					$("#last_name").val("");
					$("#email").val("");
					$("#contact").val("");
				})
				.catch((err) => {
					console.log(err);
				});
		}
	});

	//DELETE BUTTON
	$("#tableBody").on("click", async (evt) => {
		let target = evt.target;
		if (target.tagName.toLowerCase() == "i" || target.dataset.id) {
			if (target.tagName.toLowerCase() == "i") {
				target = target.parentElement;
			}
			let id = target.dataset.id;
			if (id) {
				console.log("Deleting document");
				deleteDoc(doc(db, "users", id)).then((deletedDoc) => {
					let deletedRow = document.querySelector(`tr[id="${id}"]`);
					deletedRow.parentElement.removeChild(deletedRow);
				});
			}
		}
	});
});
