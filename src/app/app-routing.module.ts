import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { personGroupComponent } from "./pages/personGroup/personGroup.component";
import { ChiBoComponent } from "./pages/ChiBo/chibo.component";
import { DangVienComponent } from "./pages/Dang-vien/dang-vien.component";
import { DangVien213Component } from "./pages/DangVien213/dangvien213.component";
import { thongkeComponent } from './pages/Thong-ke/thongke.component';
const routes: Routes = [
  { path: "", redirectTo: '/chiBo', pathMatch: 'full' },
  { path: "chiBo", component: ChiBoComponent },
  { path: "persongroup", component: personGroupComponent },
  { path: "dangVien", component: DangVienComponent },
  { path: "dangvien213", component: DangVien213Component },
  { path: "thongke", component: thongkeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
