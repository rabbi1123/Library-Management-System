import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatTabsModule, MatMenuModule, MatListModule, MatDividerModule, MatTableModule, MatPaginator, MatDialogModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';

const MaterialComponents = [
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatTabsModule,
  MatDividerModule,
  MatTableModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
