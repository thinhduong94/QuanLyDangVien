import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { personGroupComponent } from "./pages/personGroup/personGroup.component";
import { ChiBoComponent } from "./pages/ChiBo/chibo.component";
import { DangVienComponent } from "./pages/Dang-vien/dang-vien.component";

const routes: Routes = [
  { path: "", component: ChiBoComponent },
  { path: "persongroup", component: personGroupComponent },
  { path: "dangVien", component: DangVienComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
