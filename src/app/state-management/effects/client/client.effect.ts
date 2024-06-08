import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { addClient, addClientAddress, addClientAddressSuccess, addClientSuccess, loadClientById, loadClients, loadedClientById, loadedClients, updateClient, updateClientAddress, updateClientAddressSuccess, updateClientSuccess } from '../../actions/client/client.action';
import { ActionPayload } from '../../actions/payload.action';
import { ClientGet, ClientGetWithParams, ClientPost, ClientPut } from 'src/app/shared/models/admin/client/client.model';
import { ClientAddress } from 'src/app/shared/models/admin/client/client-address.model';
import { ClientService } from 'src/app/shared/services/admin/client/client.service';
import { Paginator } from 'src/app/shared/models/response.model';

@Injectable()
export class ClientsEffect {

  loadClients$ = createEffect(() => this._actions$.pipe(
    ofType(loadClients),
    map((action: ActionPayload<ClientGetWithParams>) => action.payload),
    mergeMap((params: ClientGetWithParams) => this._clientService.doGetAll(params)
      .pipe(
        map((clients: Paginator<ClientGet[]>) => loadedClients({ payload: clients.data })),
        catchError(() => EMPTY)
      ))
  )
  );

  loadClientById$ = createEffect(() => this._actions$.pipe(
    ofType(loadClientById),
    map((action: ActionPayload<ClientGet>) => action.payload),
    mergeMap((client: ClientGet) => this._clientService.doGetById(client.id)
      .pipe(
        map((client: ClientGet) => loadedClientById({ payload: client })),
        catchError(() => EMPTY)
      ))
  )
  );

  addClient$ = createEffect(() => this._actions$.pipe(
    ofType(addClient),
    map((action: ActionPayload<ClientPost>) => action.payload),
    mergeMap((client: ClientPost) => this._clientService.doPost(client)
      .pipe(
        map((client: ClientGet) => addClientSuccess({ payload: client })),
        catchError(() => EMPTY)
      ))
  )
  );

  updateClient$ = createEffect(() => this._actions$.pipe(
    ofType(updateClient),
    map((action: ActionPayload<ClientPut>) => action.payload),
    mergeMap((client: ClientPut) => this._clientService.doPut(client)
      .pipe(
        map((client: ClientGet) => updateClientSuccess({ payload: client })),
        catchError(() => EMPTY)
      ))
  )
  );

  addClientAddress$ = createEffect(() => this._actions$.pipe(
    ofType(addClientAddress),
    map((action: ActionPayload<ClientAddress[]>) => action.payload),
    mergeMap((clientAddress: ClientAddress[]) => this._clientService.doPostAddress(clientAddress)
      .pipe(
        map((client: ClientGet) => addClientAddressSuccess({ payload: client })),
        catchError(() => EMPTY)
      ))
  )
  );

  updateClientAddress$ = createEffect(() => this._actions$.pipe(
    ofType(updateClientAddress),
    map((action: ActionPayload<ClientAddress>) => action.payload),
    mergeMap((clientAddress: ClientAddress) => this._clientService.doPutAddress(clientAddress)
      .pipe(
        map((client: ClientGet) => updateClientAddressSuccess({ payload: client })),
        catchError(() => EMPTY)
      ))
  )
  );

  constructor(
    private _actions$: Actions,
    private _clientService: ClientService
  ) { }
}
