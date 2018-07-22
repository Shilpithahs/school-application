import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { enableProdMode } from '@angular/core';

//Modules
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http } from "@angular/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr'; 
// import { AuthService, AppGlobals } from 'angular2-google-login';

// Services
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { StudentService } from './services/student/student.service';

// Pipes
import { FilterPipe } from './pipes/filter.pipe';
import { PhonePipe } from './pipes/phone.pipe';

// Components
import { AppComponent } from './components/index/app.component';
import { StudentListComponent } from './components/teacher/list/student-list.component';
import { StudentDetailsComponent } from './components/teacher/details/student-details.component';
import { AddStudentComponent } from './components/teacher/add-student/add-student.component';
import { LoginComponent } from './components/login/login.component';
import { HighlightStudentDirective } from './directives/highlight-student.directive';
import { AdminComponent } from './components/admin/admin.component';
import { TeacherComponent, teacherChildRoutes } from './components/teacher/teacher.component';
import { StudentComponent, studentChildRoutes } from './components/student/student.component';
import { PersonalInfoComponent } from './components/student/personal-info/personal-info.component';
import { TestComponent } from './components/teacher/test/test.component';
import { AddSubjectComponent } from './components/teacher/add-subject/add-subject.component';
import { HomeComponent, homeChildRoutes } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';

// Parent Routes
const routes : Routes = [
// {
// 	path: '',
// 	component: HomeComponent,
// 	children :homeChildRoutes,
// 	canActivate : [AuthService]
// },
{
	path: 'login',
	component: LoginComponent
},
{
	path: 'register',
	component: RegisterComponent
},
{
	path: 'admin',
	component: AdminComponent
},
{
	path: 'teacher',
	component: TeacherComponent,
	children : teacherChildRoutes
	// canActivate : [AuthService]
},
{
	path: 'student',
	component: StudentComponent,
	children :studentChildRoutes
	// canActivate : [AuthService]
}
// {
// 	path: '**',
// 	redirectTo: ''
// }
];

@NgModule({
	declarations: [
	AppComponent,
	StudentListComponent,
	StudentDetailsComponent,
	AddStudentComponent,
	LoginComponent,
	HomeComponent,
	FilterPipe,
	PhonePipe,
	HighlightStudentDirective,
	AdminComponent,
	TeacherComponent,
	StudentComponent,
	PersonalInfoComponent,
	TestComponent,
	AddSubjectComponent,
	TestComponent,
	RegisterComponent
	],
	imports: [
	BrowserModule,
	HttpModule,
	RouterModule,
	RouterModule.forRoot(routes),
	FormsModule,
	ReactiveFormsModule,
	BrowserAnimationsModule,
	ToastrModule.forRoot({ 
		timeOut: 3000,
		positionClass: 'toast-bottom-right',
		preventDuplicates: true,
	}),
	],
	providers: [AuthService,UserService,StudentService],
	bootstrap: [AppComponent]
})

// enableProdMode();

export class AppModule { }
